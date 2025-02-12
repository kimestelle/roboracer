import Image from "next/image";
import articles from '@/data/news.json';

//title, platform, date, description, link, thumbnail

interface NewsBlockProps {
    title: string;
    platform: string;
    date: string;
    description: string;
    link: string;
    thumbnail: string;
}

const NewsBlock: React.FC<NewsBlockProps> = ({ title, platform, date, description, link, thumbnail }) => {

    return (
        <a href={link} target="_blank" rel="noreferrer noopener" className='w-full h-96 flex flex-col justify-center items-center gap-10'>
            <Image src={thumbnail} alt={title} className='w-auto h-75' width={500} height={500} />
            <h3>
                {title}
            </h3>
            <p>
                {description}
            </p>
            <p>
                {platform}
            </p>
            <p>
                {date}
            </p>
        </a>
    )

}

export default function News() {
    return (
        <div className='w-full min-h-[100svh] flex flex-col justify-center items-center pt-32'>
            <h1>News</h1>
            <div className='flex flex-col justify-center items-center gap-5'>
                { articles.map((article) => (
                    <NewsBlock key={article.title} {...article} />
                ))}
            </div>
        </div>
    )
}