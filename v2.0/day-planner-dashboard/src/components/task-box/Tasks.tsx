import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Editable, Input, EditableInput, EditablePreview, useEditableControls, ButtonGroup, Flex, IconButton, useColorModeValue, Button } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import '../../App.css'


const Tasks = () => {
  var numbers: number[] = [1, 2, 3, 4, 5, 6, 7];

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return (
        <ButtonGroup size="sm" spacing={2} mt={1} mr={3}>
          <IconButton aria-label='Submit' color={'black'} icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton aria-label='Close'color={'black'}
            icon={<CloseIcon boxSize={3} />}
            {...getCancelButtonProps()}
          />
          <IconButton aria-label='Delete' color={'black'}
            icon={<EditIcon boxSize={3} />}
            {...getEditButtonProps()}
          />
        </ButtonGroup>
    );
  }
  return (
    <Box 
      overflow={'auto'}
      borderWidth='0px' 
      borderRadius='lg' 
      bg={'rgba(45, 53, 80, 0.8)'} 
      w={{md: '35em', lg: '50em', xl: '60em', '2x;': '65em'}} 
      h={{base: '20em', '2xl': '25em'}} 
      boxShadow={'rgba(0, 0, 0, 0.74) 0px 3px 8px'} 
      color={'white'}>
      <Box 
        overflowY={'auto'}
        p='6'>
        <Flex direction={'row'} wrap={'nowrap'}>
          <Input w={'80%'} h={'3em'} placeholder='Add a task' mb={3} borderWidth={0} bg={'whiteAlpha.500'} color={'white'}></Input>
          <Button ml={3} w={'25%'} h={'3em'} variant={'outline'} colorScheme='white'>Add Task</Button>
        </Flex>
        {numbers.map((number) => 
            <Editable
              pt={1}
              mb={3}
              h={'3em'}
              w={'100%'}
              borderRadius='lg'
              bg={'whiteAlpha.500'}
              defaultValue={`Task ${number}`}
              isPreviewFocusable={true}
              selectAllOnFocus={false}>
              <Flex flexDirection={'row'} wrap={'nowrap'} justifyContent={'space-between'}>
                <EditablePreview
                    py={2}
                    px={4}
                    // _hover={{
                    //   background: useColorModeValue("gray.100", "gray.700")
                    // }}
                >
                </EditablePreview>
                <EditableControls />
              </Flex>
              <Input py={2} px={4} as={EditableInput} />
            </Editable>
        )}
      </Box>
    </Box>
  )
}

export default Tasks
