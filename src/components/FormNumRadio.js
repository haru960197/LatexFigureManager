import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

export const FormNumRadio = ({ formNum, onRadioChange }) => {
    return (
        <Container centerContent>
            <label>1つのFigure要素に含める画像の枚数を選択</label>
            <RadioGroup onChange={onRadioChange} value={formNum} >
                <Stack direction="row">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </Stack>
            </RadioGroup>
        </Container>
    );
};