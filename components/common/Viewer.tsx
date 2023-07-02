type ViewerProps = {
  html: string,
};

const Viewer = ({ html }: ViewerProps) => {
  return <div
    className="prose prose-p:my-3 prose-hr:my-5 prose-ul:my-1 prose-code:text-xs prose-code:before:content-none prose-code:after:content-none"
    dangerouslySetInnerHTML={{ __html: html }}
  />;
};

export default Viewer;
