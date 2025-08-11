import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { githubFetch } from "@/lib/github";

const allowedRepos = [
  "LoLIN",
  "mindwiki",
  "hossi-tistory",
  "MARS",
  "mindwiki",
  "wedding",
];

export default async function ProjectsPage() {
  const user = (await githubFetch("/user")) as any;
  const repos = (await githubFetch("/user/repos")) as any;
  const filteredRepos = repos.filter(
    (repo: any) =>
      allowedRepos.includes(repo.name) && repo.url.includes("hossi-py")
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-end items-center w-full gap-2">
        <Avatar className="rounded-lg">
          <AvatarImage src={user.avatar_url} alt="Github User Icon" />
        </Avatar>
        {user.login}의 Github
      </div>

      <div>
        {filteredRepos.map((repo: any) => (
          <div key={repo.id}>
            <a href={repo.html_url} target="_blank">
              {repo.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
