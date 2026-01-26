import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import Fileuploader from "~/components/Fileuploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../constant";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) {
            setStatusText(<span style={{background: 'red', color: 'white'}}>Error: Failed to convert PDF to image</span> as unknown as string);
            return;
        }

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
             uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        
        if (!feedback) return setStatusText('Error: Failed to analyze your resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    
    if (!form) {
      console.warn("No form submitted.");
      return;
    }
    const formData = new FormData(form);
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;
    
    // test in console.
    // console.log("Submitting resume file:", {
      //   companyName,
      //   jobTitle,
      //   jobDescription,
      //   file
      //  })
      
      if(!file) {
          console.warn("No file selected.");
          return;
      }
      handleAnalyze({companyName, jobTitle, jobDescription, file})
}

  return (
    <main className="bg-blue-800">
      <Navbar/>

      <section className="main-section border-white p-5">
        <div className="text-white flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4 py-16">
          <div className="corner-borders font-roboto-slab max-sm:text-[3rem] text-6xl corner-borders p-1 text-amber-300 mb-4 ">
            <span className="corner tl"></span>
            <span className="corner tr"></span>
            <span className="corner bl"></span>
            <span className="corner br"></span>
            Smart feedback for your dream job</div>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" alt="" className="w-full" />
            </>
          ) : (
            <div className="text-white text-1xl ">  
              <div className="flex justify-center items-center gap-4">
                <img src="/images/Sitonchair.png" alt="Siton Chair" className="w-1/3" />
                <div className="text-2xl font-roboto-slab">Drop your Information for ATS Score and Improvement Tips</div>
              </div>
            </div>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              
              <div className="form-div text-black">
                <label htmlFor="company-name" className="bg-amber-300 text-3xl">[Company Name]</label>
                <input type="text" name="company-name" placeholder="Company Name" id="company-name"/>
              </div>

              <div className="form-div text-black">
                <label htmlFor="job-title" className="text-3xl bg-amber-300">[Job Title]</label>
                <input type="text" name="job-title" placeholder="job-title" id="job-title" />

              </div>
              <div className="form-div text-black">
                <label htmlFor="job-description" className="bg-amber-300 text-3xl">[Job Description]</label>
                <textarea rows={5} name="job-description" placeholder="job-description" id="job-description"/>
              </div>
              <div className="form-div ">
                <label htmlFor="uploader" className="bg-amber-300 text-3xl">[Upload Resume]</label>
                  <Fileuploader onFileSelect={handleFileSelect}/>
              </div>
              <button className="primary-button" type="submit">
                Analyse Resume
              </button>

            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
