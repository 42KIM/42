type ViewerProps = {
  html: string,
};

const Viewer = ({ html }: ViewerProps) => {
  return <div
    className="prose prose-sm prose-p:my-1 prose-hr:my-5 prose-ul:my-1 prose-code:text-xs"
    dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Viewer;
