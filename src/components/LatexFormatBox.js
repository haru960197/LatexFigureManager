import { Text, Textarea, Box, Button } from "@chakra-ui/react";
import { useState } from "react";

function latexFormatString(newFigures) {
    const figures = newFigures.map((figure) => (
        {
            fileName: figure.object.name,
            caption: figure.caption,
            label: figure.label
        }
    ));
    switch(figures.length) {
        case 0:
            return '';
        case 1:
            return `\\begin{figure}[H]
    \\centering
    \\includegraphics[width=\\textwidth]{pic/${figures[0].fileName}}
    \\caption{${figures[0].caption}}
    \\label{${figures[0].label}}
\\end{figure}`;
        case 2:
            return `\\begin{figure}[H]
    \\begin{tabular}{cc}
        \\begin{minipage}[t]{0.5\\textwidth}
            \\centering
            \\includegraphics[width=1.0\\textwidth]{pic/${figures[0].fileName}}
            \\caption{${figures[0].caption}}
            \\label{${figures[0].label}}
        \\end{minipage} &
        \\begin{minipage}[t]{0.5\\textwidth}
            \\centering
            \\includegraphics[width=1.0\\textwidth]{pic/${figures[1].fileName}}
            \\caption{${figures[1].caption}}
            \\label{${figures[1].label}}
        \\end{minipage}
    \\end{tabular}
\\end{figure}`;
        case 3:
            return `\\begin{figure}[H]
    \\begin{tabular}{ccc}
        \\begin{minipage}[t]{0.3\\textwidth}
            \\centering
            \\includegraphics[width=1.0\\textwidth]{pic/${figures[0].fileName}}
            \\caption{${figures[0].caption}}
            \\label{${figures[0].label}}
        \\end{minipage} &
        \\begin{minipage}[t]{0.3\\textwidth}
            \\centering
            \\includegraphics[width=1.0\\textwidth]{pic/${figures[1].fileName}}
            \\caption{${figures[1].caption}}
            \\label{${figures[1].label}}
        \\end{minipage} &
        \\begin{minipage}[t]{0.3\\textwidth}
            \\centering
            \\includegraphics[width=1.0\\textwidth]{pic/${figures[2].fileName}}
            \\caption{${figures[2].caption}}
            \\label{${figures[2].label}}
        \\end{minipage}
    \\end{tabular}
\\end{figure}
`;
    }
}

export const LatexFormatBox = ({ newFigures }) => {
    const [buttonValue, setButtonValue] = useState("COPY");
    const content = latexFormatString(newFigures);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setButtonValue("COPIED");
            console.log("Copied successfully");
            setTimeout(() => setButtonValue("COPY"), 2000);
        } catch {
            console.error("Failed to copy");
        }
    };

    return (
        <>
            <Text htmlFor="latex" as="u" >Latex書式</Text>

            <Box mt={1} bg="transparent" borderRadius="md">
                <Textarea
                    id="latex"
                    cols="65"
                    rows="6"
                    color="teal.200"
                    backgroundColor="#031426"
                    border={false}
                    resize="none"
                    isReadOnly={true}
                    value={content}
                />
                <Button
                    bottom="145px"
                    left="525px"
                    colorScheme='teal'
                    m="1.5"
                    minW="80px" // ボタンの最小幅を設定
                    maxW="80px" // ボタンの最大幅を設定
                    maxH="35px"
                    whiteSpace="nowrap" // テキストがボタンの幅を超えて折り返さないようにする
                    overflow="hidden" // テキストがボタンの幅を超えたときに隠す
                    textOverflow="ellipsis" // テキストがボタンの幅を超えたら省略記号で表示
                    onClick={handleCopyClick}
                >{buttonValue}</Button>
            </Box>
        </>
    );
};
