import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PostInput from "./PostInput";

export default function PostModal({ open, onClose, onPosted }) {
  const handleAddImmediately = (newPost) => {
    // notify parent callback
    if (onPosted) onPosted(newPost);
    // dispatch a global event so other parts of the app (like Home) can refresh
    try {
      window.dispatchEvent(new CustomEvent("postCreated", { detail: newPost }));
    } catch (e) {
      // ignore if dispatch fails in some environments
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        background: "rgba(56, 56, 56, 0.5)",
        "& .MuiPaper-root": {
          background: "#000",
          borderRadius: "20px",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
      slotProps={{
        Transition: () => {
          // focus the textarea/input inside the PostInput form when dialog opens
          setTimeout(() => {
            try {
              const el = document.querySelector(
                "#postForm textarea, #postForm input"
              );
              if (el && typeof el.focus === "function") el.focus();
            } catch (e) {}
          }, 0);
        },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <PostInput addImmediately={handleAddImmediately} />
      </DialogContent>
    </Dialog>
  );
}

// TODO - Can make PostModal into a single resuable component for editing posts too just need to figure out how
