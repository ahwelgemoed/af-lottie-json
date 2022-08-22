import { useEffect, useRef, useState } from "react";
import {
  FaCopy,
  FaEye,
  FaSpinner,
  FaArrowAltCircleDown,
  FaCircle,
} from "react-icons/fa";
import Lottie from "lottie-react";
import { useRouter } from "next/router";

type ShowAndCopyType = {
  json: string;
};

const ShowAndCopy = (props: ShowAndCopyType) => {
  const router = useRouter();
  const [setCopy, setSetCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const jsonSelected = useRef<HTMLElement>(null);

  useEffect(() => {
    if (setCopy) {
      setTimeout(() => {
        setSetCopy(false);
      }, 3000);
    }
  }, [setCopy]);

  /**
   * Copying straight to Clipboard gives issues when pasting into Mendix.
   * This helps us get the json sting from a hidden HTML element
   */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  const copyToClipBoard = async () => {
    if (jsonSelected.current) {
      try {
        await navigator.clipboard.writeText(
          jsonSelected.current?.innerText as string
        );
        setSetCopy(true);
      } catch (error) {
        setSetCopy(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 h-full p-5">
      <h3 className="text-lg">👏🏽👏🏽👏🏽 Preview 👏🏽👏🏽👏🏽</h3>
      <Lottie
        animationData={JSON.parse(props.json)}
        loop={true}
        style={{ width: 100 }}
      />
      <p className="text-sm text-center">
        You can click copy or select the text and paste it into Mendix
      </p>
      <div className="flex pt-6">
        <button
          className="btn btn-secondary flex"
          onClick={copyToClipBoard}
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="mr-2 animate-spin" />
          ) : (
            <FaCopy className="mr-2 " />
          )}
          Copy
        </button>
        <label htmlFor="my-modal" className="btn btn-primary ml-2">
          <FaEye className="mr-2" />
          View
        </label>
        <button className="btn ml-2 " onClick={router.reload}>
          <FaCircle className="mr-2" />
          New
        </button>
        {!isLoading && (
          <code
            style={{
              height: 100,
              position: "absolute",
              top: 9999999,
              right: 9999999,
              opacity: 0,
            }}
            ref={jsonSelected}
          >
            {"'"}
            {props.json}
            {"'"}
          </code>
        )}
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Here is your Animation JSON in String form
          </h3>
          <div className="bg-base-200 p-6 mt-4 rounded-lg">
            <code>{props.json}</code>
          </div>

          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      {setCopy ? (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <div>
              <span>Copied To Clipboard</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShowAndCopy;
