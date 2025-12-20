interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage: string;
}

export default function PageHeader({
    title,
    subtitle,
    backgroundImage,
}: PageHeaderProps) {
    return (
        <section
            id="page-header"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h2>{title}</h2>
            {subtitle && <p style={{ color: 'aliceblue' }}>{subtitle}</p>}
        </section>
    );
}
