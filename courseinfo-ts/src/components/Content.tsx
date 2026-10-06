type CoursePart = {
name: string;
exerciseCount: number;
};

type ContentProps = {
parts: CoursePart[];
};

const Content = ({ parts }: ContentProps) => {
return (
<div>
{parts.map((part) => (
<p key={part.name}>
{part.name} {part.exerciseCount}
</p>
))}
</div>
);
};

export default Content;