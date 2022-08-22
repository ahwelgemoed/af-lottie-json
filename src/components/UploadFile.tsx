import { FaSpinner, FaUpload } from "react-icons/fa";

type UploadFile = {
  file: File;
  isLoading: boolean;
  uploadAndConvert: () => void;
};

const UploadFile = (props: UploadFile) => {
  return (
    <div>
      <button
        disabled={!props.file}
        className="btn btn-secondary btn mt-2"
        onClick={props.uploadAndConvert}
      >
        {props.isLoading ? (
          <FaSpinner className="mr-2 animate-spin" />
        ) : (
          <FaUpload className="mr-2" />
        )}
        Upload File and Convert
      </button>
    </div>
  );
};

export default UploadFile;
