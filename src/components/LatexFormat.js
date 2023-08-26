export const LatexFormat = ({ newFileInfo }) => {
    const { object, caption, label } = newFileInfo;
    const fileName = object.name;
    const content = fileName && caption && label
    ?
`\\begin{figure}[H]
    \\centering
    \\includegraphics[width=\\textwidth]{pic/${fileName}}
    \\caption{${caption}}
    \\label{${label}}
\\end{figure}`
    : '';
    return (
        <>
            <label htmlFor="latex">Latex書式</label>
            <textarea id="latex" cols="65" rows="6" value={content} />
        </>
    );
};