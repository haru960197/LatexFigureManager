import { Text, Textarea, Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export const LatexFormat = ({ newFigure }) => {
    const { object, caption, label } = newFigure;
    const fileName = object.name;
    const [buttonValue, setButtonValue] = useState("COPY");
    const content = fileName && caption && label
    ?
`\\begin{figure}[H]
    \\centering
    \\includegraphics[width=\\textwidth]{pic/${fileName}}
    \\caption{${caption}}
    \\label{${label}}
\\end{figure}`
    : '';

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