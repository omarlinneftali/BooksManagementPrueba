import swal from "sweetalert";
import { toast } from "react-toastify";

export const messageConfirmationDialog = ({
  title,
  text,
  icon = "warning",
  buttons = true,
  dangerMode = true,
  callback,
}) => {
  swal({
    title,
    text,
    icon,
    buttons,
    dangerMode,
  }).then(callback);
};

export const messageDialog = ({ text, type = "success", id }) => {
  toast[type](text, {
    toastId: id || text,
  });
};

export const messageDialogError = ({ text, id, type = "error" }) => {
  toast[type](text, {
    toastId: id || text,
  });
};

export const displayHttpErrorMessage = (error) => {
  const errorMessage = error?.response?.data;
  messageDialogError({ text: errorMessage, id: "error" });
};
