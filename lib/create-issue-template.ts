type GithubIssueTemplate = {
  postId: string,
  author: string,
  authorUrl: string,
  content: string,
};

export const createGithubIssueTemplate = ({ postId, author, authorUrl, content }: GithubIssueTemplate) =>
  `### Author: ${author}` + '\n' +
  `### Github: ${authorUrl}` + '\n' +
  `### Content: ${content}` + '\n' +
  `### Link: ${process.env.BASE_URL}/posts/${postId}`;
