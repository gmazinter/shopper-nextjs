import React from 'react';
import Card from './primitives/Card';
import Flex, { Centered } from './primitives/Flex';
import Chip from './Chip';
import DoneIcon from '@material-ui/icons/Done';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useAppState } from '../AppState';
import Text from './primitives/Text';
import { Button } from '@material-ui/core';
import _ from 'lodash';
import { useAnnotateImage } from '../hooks/useAnnotateImage';

export default () => {
    const { annotateImage, isLoading, error } = useAnnotateImage();
    const { state: { imageAnnotationResults, moreLabels, highlightedImage }, dispatch } = useAppState();
    const labels = imageAnnotationResults
        ? [
            ...imageAnnotationResults.labelAnnotations,
            ...imageAnnotationResults.webDetection.webEntities
        ].map(x => x.description).filter(label => label)
        : null;

    return (
        <Card>hello</Card>
        // <Card
        //     bg='lightGrey'
        //     borderRadius={2}
        //     border='3px solid white'
        // >
        //     {imageAnnotationResults
        //         ? <Flex flexWrap='wrap'>
        //             {labels?.map(label => (
        //                 <Chip
        //                     size='small'
        //                     id={label}
        //                     onClick={() => {
        //                         dispatch({
        //                             type: 'setMoreLabels',
        //                             payload: label
        //                         })
        //                     }}
        //                     mr={2}
        //                     mb={1}
        //                     label={label}
        //                     icon={_.includes(moreLabels, label) ? < DoneIcon /> : <RadioButtonUncheckedIcon />}
        //                 />
        //             ))}
        //         </Flex>
        //         : <Centered
        //             flex={1}
        //             p={2}
        //         >
        //             {isLoading
        //                 ? <Text>Laoding...</Text>
        //                 : <Button
        //                     disabled={!highlightedImage}
        //                     onClick={() => {
        //                         if (highlightedImage) {
        //                             annotateImage()
        //                         }
        //                     }}
        //                     size='small'
        //                     variant='contained'
        //                     color='secondary'
        //                 >
        //                     Refine Search
        //                 </Button>
        //             }
        //         </Centered>
        //     }
        // </Card >
    )
};