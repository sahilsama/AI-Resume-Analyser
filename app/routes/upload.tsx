import Navbar from "~/components/Navbar";
import Fileuploader from "~/components/Fileuploader";
import { useState, type FormEvent } from "react";

const upload = () => {
  
  const [isProcessing, setProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>();
  const handleFileSelect =(file: File | null) =>{
    setFile(file)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{


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
            <div className="text-white text-1xl">  
              <div className="flex justify-center items-center gap-4">
                <img src="/images/Sitonchair.png" alt="Siton Chair" className="w-1/3" />
                <div className="text-2xl font-roboto-slab">Drop your Information for ATS Score and Improvement Tips</div>
              </div>
            </div>
          )}
          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name" className="bg-amber-300 text-3xl">[Company Name]</label>
                <input type="text" name="company-name" placeholder="Company Name" id="company-name"/>
              </div>

              <div className="form-div">
                <label htmlFor="job-title" className="text-3xl bg-amber-300">[Job Title]</label>
                <input type="text" name="job-title" placeholder="job-title" id="job-title" />

              </div>
              <div className="form-div">
                <label htmlFor="job-description" className="bg-amber-300 text-3xl">[Job Description]</label>
                <textarea rows={5} name="job-description" placeholder="job-description" id="job-description"/>
              </div>
              <div className="form-div">
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

export default upload;
