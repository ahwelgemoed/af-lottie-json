import { useEffect, useState } from "react";
import { FaCopy, FaEye } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Lottie from "lottie-react";

type ShowAndCopyType = {
  json: string;
};

const ShowAndCopy = (props: ShowAndCopyType) => {
  const [setCopy, setSetCopy] = useState(false);
  useEffect(() => {
    if (setCopy) {
      setTimeout(() => {
        setSetCopy(false);
      }, 3000);
    }
  }, [setCopy]);

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 h-full p-5">
      <h3 className="text-lg">👏🏽 Great</h3>
      <Lottie
        animationData={JSON.parse(props.json)}
        loop={true}
        style={{ width: 100 }}
      />
      <p className="text-sm text-center">
        You can click copy or select the text and paste it into Mendix
      </p>
      <div className="flex pt-6">
        <CopyToClipboard
          //@ts-ignore
          className="btn btn-secondary"
          text={props.json}
          onCopy={() => setSetCopy(true)}
        >
          <span>
            <FaCopy className="mr-2" />
            Copy Code
          </span>
        </CopyToClipboard>
        <label htmlFor="my-modal" className="btn ml-2">
          <FaEye className="mr-2" />
          View Code
        </label>
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
