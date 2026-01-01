import CommentIcon from "@mui/icons-material/Comment";

export default function CommentButton({ onClick, initialComments }) {
  const handle = (e) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <div className="commentButton" onClick={handle}>
      <CommentIcon /> {initialComments}
    </div>
  );
}
