import { CustomProgress } from "@/components/custom/custom-progress";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { githubFetch } from "@/lib/github";
import { FolderGit2 } from "lucide-react";
import Link from "next/link";

const allowedRepos = [
  "LoLIN",
  "mindwiki",
  "hossi-tistory",
  "MARS",
  "mindwiki",
  "wedding",
];

export default async function ProjectsPage() {
  const repos = (await githubFetch("/user/repos")) as any;
  const filteredRepos = repos.filter((repo: any) =>
    allowedRepos.includes(repo.name)
  );
  const repoWithLanguages = await Promise.all(
    filteredRepos.map(async (repo: any) => {
      const languages = (await githubFetch(
        `/repos/hossi-py/${repo.name}/languages`
      )) as Record<string, string>;
      const formattedLanguages = Object.keys(languages).map((key) => ({
        title: key,
        value: languages[key],
      }));
      return {
        ...repo,
        formattedLanguages,
      };
    })
  );

  return (
    <div className="flex flex-col">
      <div>
        {repoWithLanguages.map((repo: any) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
              <CardDescription>{repo.description}</CardDescription>
              <CardAction>
                <Link href={repo.html_url} target="_blank">
                  <FolderGit2 />
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent>
              <CustomProgress segments={repo.formattedLanguages} />
            </CardContent>
            <CardFooter className="flex gap-2"></CardFooter>
          </Card>
          // <div key={repo.id}>
          //   <a href={repo.html_url} target="_blank">
          //     {repo.name}
          //     {repo.description}
          //     {repo.topics}
          //     {repo.created_at}
          //     {repo.pushed_at}
          //     {repo.stargazers_count}
          //     {repo.watchers_count}
          //     {repo.forks_count}
          //     {repo.languages}
          //   </a>
          // </div>
        ))}
      </div>
    </div>
  );
}
