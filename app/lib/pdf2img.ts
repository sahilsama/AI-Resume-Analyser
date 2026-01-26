export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
  }
  
  let pdfjsLib: any = null;
  let isLoading = false;
  let loadPromise: Promise<any> | null = null;
  
  async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;
  
    isLoading = true;
    loadPromise = import("pdfjs-dist/build/pdf.mjs")
      .then((lib) => {
        // Handle both default and named exports
        const pdfjs = lib.default || lib;
        
        // Set the worker source to use local file
        if (pdfjs.GlobalWorkerOptions) {
          pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        }
        
        pdfjsLib = pdfjs;
        isLoading = false;
        return pdfjs;
      })
      .catch((error) => {
        isLoading = false;
        loadPromise = null;
        console.error("Failed to load PDF.js:", error);
        throw error;
      });
  
    return loadPromise;
  }
  
  export async function convertPdfToImage(
    file: File
  ): Promise<PdfConversionResult> {
    try {
      const lib = await loadPdfJs();

      if (!lib || !lib.getDocument) {
        const error = "PDF.js library not loaded correctly";
        console.error(error);
        return {
          imageUrl: "",
          file: null,
          error,
        };
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
      
      if (!pdf) {
        const error = "Failed to load PDF document";
        console.error(error);
        return {
          imageUrl: "",
          file: null,
          error,
        };
      }

      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 4 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        const error = "Failed to get canvas context";
        console.error(error);
        return {
          imageUrl: "",
          file: null,
          error,
        };
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      await page.render({ canvasContext: context, viewport }).promise;

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a File from the blob with the same name as the pdf
              const originalName = file.name.replace(/\.pdf$/i, "");
              const imageFile = new File([blob], `${originalName}.png`, {
                type: "image/png",
              });

              resolve({
                imageUrl: URL.createObjectURL(blob),
                file: imageFile,
              });
            } else {
              const error = "Failed to create image blob from canvas";
              console.error(error);
              resolve({
                imageUrl: "",
                file: null,
                error,
              });
            }
          },
          "image/png",
          1.0
        );
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("PDF conversion error:", err);
      return {
        imageUrl: "",
        file: null,
        error: `Failed to convert PDF: ${errorMessage}`,
      };
    }
  }