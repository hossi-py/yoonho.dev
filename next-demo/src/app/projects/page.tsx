import { FolderGit2 } from 'lucide-react';
import Link from 'next/link';

import { CustomProgress } from '@/components/custom/custom-progress';
import { GridItem } from '@/components/custom/grid-item';
import { GridStage } from '@/components/custom/grid-stage';
import { GridLayout } from '@/components/layout/grid-layout';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { githubFetch } from '@/lib/github';

const allowedRepos = ['LoLIN', 'mindwiki', 'hossi-tistory', 'MARS', 'mindwiki', 'wedding'];

const langColor: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  CSS: '#663399',
  HTML: '#e34c26',
  Python: '#3572A5',
  Java: '#b07219',
  GLSL: '#5686a5',
  SCSS: '#c6538c',
  Less: '#1d365d',
};

export default async function ProjectsPage() {
  const repos = (await githubFetch('/user/repos')) as any;
  const filteredRepos = repos.filter((repo: any) => allowedRepos.includes(repo.name));
  const repoWithLanguages = await Promise.all(
    filteredRepos.map(async (repo: any) => {
      const languages = (await githubFetch(`/repos/hossi-py/${repo.name}/languages`)) as Record<
        string,
        string
      >;
      const formattedLanguages = Object.keys(languages).map((key) => ({
        title: key,
        value: languages[key],
        color: langColor[key] ?? 'bg-primary',
      }));
      return {
        ...repo,
        formattedLanguages,
      };
    })
  );

  return (
    <GridLayout>
      <div>01</div>
      <div>02</div>
      <div>03</div>
      <div>04</div>
      <div>05</div>
      <div>06</div>
      <div>07</div>
      <div>08</div>
      <div>09</div>
    </GridLayout>
    // <GridStage>
    //   {repoWithLanguages.map((repo: any) => (
    //     <Card key={repo.id} className="w-full h-full">
    //       <CardHeader>
    //         <CardTitle>{repo.name}</CardTitle>
    //         <CardDescription>{repo.description}</CardDescription>
    //         <CardAction>
    //           <Link href={repo.html_url} target="_blank">
    //             <FolderGit2 />
    //           </Link>
    //         </CardAction>
    //       </CardHeader>
    //       <CardContent>
    //         <div>
    //           <CustomProgress segments={repo.formattedLanguages} />
    //         </div>
    //       </CardContent>
    //       <CardFooter className="flex gap-2"></CardFooter>
    //     </Card>

    //     // <div key={repo.id}>
    //     //   <a href={repo.html_url} target="_blank">
    //     //     {repo.name}
    //     //     {repo.description}
    //     //     {repo.topics}
    //     //     {repo.created_at}
    //     //     {repo.pushed_at}
    //     //     {repo.stargazers_count}
    //     //     {repo.watchers_count}
    //     //     {repo.forks_count}
    //     //     {repo.languages}
    //     //   </a>
    //     // </div>
    //   ))}
    // </GridStage>
  );
}
