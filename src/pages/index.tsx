import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import ShowAndCopy from "../components/ShowAndCopy";
import UploadFile from "../components/UploadFile";

enum DisplayToUser {
  DROP,
  UPLOAD,
  SHOW,
}

const Home: NextPage = () => {
  const [whatToDisplay, setWhatToDisplay] = useState<DisplayToUser>(
    DisplayToUser.DROP
  );
  const [jsonToCopy, setJsonToCopy] = useState<string>("");
  const [enterDragFrame, setEnderDragFrame] = useState<boolean>(false);
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadAndConvert = () => {
    if (fileToUpload) {
      const newForm = new FormData();

      newForm.append("File", fileToUpload);

      fetch("/api", {
        method: "POST",
        body: newForm,
      })
        .then((response) => response.json())
        .then((result) => {
          setJsonToCopy(result.json);
          setWhatToDisplay(DisplayToUser.SHOW);
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const onTargetClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileInputChange = (event: any) => {
    const { files } = event.target as HTMLInputElement;
    if (files?.length) {
      handelValidationAndSetState(files);
    }
  };

  const handelValidationAndSetState = (files: FileList) => {
    const foundFile = files[0];
    if (foundFile?.type !== "application/json") {
      console.log("Wrong File Type");
      return;
    }
    setEnderDragFrame(false);
    setFileToUpload(foundFile);
    setWhatToDisplay(DisplayToUser.UPLOAD);
  };

  const orchestratesDisplay = () => {
    switch (whatToDisplay) {
      case DisplayToUser.SHOW:
        return <ShowAndCopy json={jsonToCopy} />;
      case DisplayToUser.UPLOAD:
        if (fileToUpload) {
          return (
            <>
              <div className="flex flex-col justify-center items-center bg-base-100 pt-5 pb-5 h-full">
                <h3 className="text-lg">File to Convert:</h3>
                <code className="bg-neutral p-2">{fileToUpload.name}</code>
                <UploadFile
                  file={fileToUpload}
                  uploadAndConvert={uploadAndConvert}
                />
              </div>
            </>
          );
        }
        return <>Somethings Wrong</>;
      case DisplayToUser.DROP:
      default:
        return (
          <>
            <FileDrop
              onTargetClick={onTargetClick}
              onDragOver={(event) => {
                setEnderDragFrame(true);
              }}
              onDragLeave={(event) => {
                setEnderDragFrame(false);
              }}
              onDrop={(files, event) => {
                event.preventDefault();
                if (files?.length) {
                  handelValidationAndSetState(files);
                }
              }}
            >
              <button className="btn">
                <span className="animate-bounce">💧</span> your animation file
                here
              </button>
              <input
                onChange={onFileInputChange}
                ref={fileInputRef}
                type="file"
                className="hidden"
              />
            </FileDrop>
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <title>MX Lottie JSON</title>
        <meta name="description" content="Mendix-Lottie Helper : Json String" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="h-screen flex justify-center items-center flex-col">
        <div className="flex flex-col justify-center items-center  w-8/12">
          <div className="hero bg-base-200 rounded-xl p-6 h-fit">
            <div className="hero-content grid gap-4 grid-cols-1 grid-rows-1 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <h1 className="sm:text-5xl text-2xl font-bold">
                  <Link href="https://airbnb.design/lottie/" target={"_blank"}>
                    <a className="underline" target={"_blank"}>
                      Lottie
                    </a>
                  </Link>
                  <span className="ml-2 mendix">Mendix</span> Helper
                </h1>
                <p className="py-6">
                  Drop your <code className="kbd">.json</code> lottie Animation
                  here, and we will convert it into the correct string for use
                  with the Lottie Widgets in Mendix{" "}
                  <Link
                    href="https://marketplace.mendix.com/link/component/115913"
                    target="_blank"
                  >
                    <a
                      className="link link-secondary"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      Web
                    </a>
                  </Link>{" "}
                  or{" "}
                  <Link href="#" target="_blank">
                    <a
                      role="button"
                      className="link link-secondary"
                      target={"_blank"}
                    >
                      Native (TBA)
                    </a>
                  </Link>
                </p>
              </div>
              <div className="card w-full bg-base-100 h-full rounded-xl">
                <div
                  className={`card-body border-secondary rounded-xl gap-0 p-0 justify-center uploadbox sm:h-36 ${
                    enterDragFrame ? "uploadbox-active" : ""
                  }
                  `}
                >
                  {orchestratesDisplay()}
                </div>
              </div>
            </div>
          </div>
          <div className="items-center grid-flow-col self-end mt-3 pl-2 pr-2 pb-1 rounded-lg bg-neutral">
            <span className="text-xs">
              <Link
                href="https://github.com/mendixlabs/app-services-components"
                target="_blank"
              >
                made by 🧘🏽‍♂️ in 2022
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
