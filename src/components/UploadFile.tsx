import { FaUpload } from "react-icons/fa";

type UploadFile = {
  file: File;
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
        <FaUpload className="mr-2" />
        Upload File and Convert
      </button>
    </div>
  );
};

export default UploadFile;
