import { toast, Zoom } from "react-toastify";
import { useCallback } from "react";

const defaultOptions = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Zoom,
};

const useToast = () => {
  // useCallback으로 감싸서 불필요한 재생성 방지
  const showToast = useCallback((type, message) => {
    switch (type) {
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "default":
        toast(message, { ...defaultOptions, autoClose: 3000 });
        break;
      case "info":
      default:
        toast.info(message, defaultOptions);
        break;
    }
  }, []);

  return { showToast };
};

export default useToast;
