import { Text, Textarea, Box, Button } from "@chakra-ui/react";

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

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(content);
            console.log("Copied successfully");
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
                    // postion="relative"
                    onClick={handleCopyClick}
                >コピー</Button>
            </Box>
        </>
    );
};