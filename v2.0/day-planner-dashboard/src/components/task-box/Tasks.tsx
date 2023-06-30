import React, { Component, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Editable, Input, EditableInput, EditablePreview, useEditableControls, ButtonGroup, Flex, IconButton, useColorModeValue, Button } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon,  } from '@chakra-ui/icons'
import '../../App.css'


const Tasks = () => {
  var numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
  const [tasks, setTasks] = React.useState(numbers);

  function EditableControls({index}: any) {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return  isEditing ? (
        <ButtonGroup size="sm" spacing={2} mt={1} mr={3}>
          <IconButton aria-label='Submit' color={'black'} icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton aria-label='Cancel'color={'black'}
            icon={<CloseIcon boxSize={3} />}
            {...getCancelButtonProps()}
          /> 
        </ButtonGroup>) 
        :
          (<ButtonGroup mt={1} mr={3} size="sm" >
            <IconButton aria-label='Edit' color={'black'}
              icon={<EditIcon boxSize={3} />}
              {...getEditButtonProps()}
            />
            <IconButton aria-label='Delete' color={'black'}
              icon={<DeleteIcon boxSize={3} />}
              onClick={() => {
                tasks.splice(parseInt(index), 1)
                setTasks([...tasks])
              }
            }
            />
          </ButtonGroup>)
          
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
        {tasks.map((number, i) => 
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
                  borderWidth='0px' 
                  borderColor={'white'}
              >
              </EditablePreview>
              <Input borderWidth='0px' borderColor={'white'} _focus={{boxShadow: "none", }} as={EditableInput} />
              <EditableControls index={i}/>
            </Flex>
          </Editable>
        )}
      </Box>
    </Box>
  )
}

export default Tasks
