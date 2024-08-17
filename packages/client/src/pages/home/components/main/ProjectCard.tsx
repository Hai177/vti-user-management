const HomeProjectCard =({ projectName }: { projectName: string }) => {
    return (
        <div className="project-card">
            <div className="project-card-title">
                {projectName}
            </div>
        </div>
    )
}
export default HomeProjectCard