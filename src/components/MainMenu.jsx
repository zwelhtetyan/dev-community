import {
   Menu,
   MenuButton,
   MenuDivider,
   MenuList,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import CustomAvatar from '../utils/Avatar';
import CustomMenuItem from '../utils/CustomMenuItem';

const MainMenu = () => {
   const navigate = useNavigate();
   const user = useAuth();

   const profileData = useSelector((state) => state.profileData.profileData);

   let currentUserProfile = null;
   if (profileData) {
      currentUserProfile = profileData.find(
         (data) => data.userId === user?.userId
      );
   }

   return (
      <Menu autoSelect={false}>
         <MenuButton
            _hover={{
               filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))',
            }}
            transition='.3s'
         >
            <CustomAvatar profile={currentUserProfile?.profile} size='40px' />
         </MenuButton>

         <MenuList
            p='.5rem'
            minW={{ base: '0 !important' }}
            w='250px'
            boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
            bg='white'
         >
            <CustomMenuItem
               onClick={() => navigate(`/profile/${currentUserProfile.userId}`)}
            >
               <VStack>
                  <Text>{currentUserProfile?.name}</Text>
               </VStack>
            </CustomMenuItem>

            <MenuDivider h='.5px' bg='#d6d6d7' />

            <CustomMenuItem onClick={() => navigate('/dashboard')}>
               Dashboard
            </CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/create-post')}>
               Create Post
            </CustomMenuItem>
            <CustomMenuItem>Reading List</CustomMenuItem>
            <CustomMenuItem onClick={() => navigate('/apperance')}>
               Apperance
            </CustomMenuItem>

            <MenuDivider h='.5px' bg='#d6d6d7' />

            <CustomMenuItem onClick={() => navigate('/signout-confirm')}>
               Sign Out
            </CustomMenuItem>
         </MenuList>
      </Menu>
   );
};

export default MainMenu;
