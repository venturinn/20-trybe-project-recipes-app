import styled from 'styled-components';
import { SiCodechef } from 'react-icons/si';
import Button from '../../components/Button';
import Input from '../../components/Input';

export const LoginContainer = styled.section`
  background-image: url(${((props) => props.theme.bg)});
  background-size: 430px 640px;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
`;

export const OpacityContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 40px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-top: -25px;
  filter: drop-shadow(0px 0px 7px rgb(0 0 0 / 0.2));
`;

export const ChefHat = styled(SiCodechef)`
  color:#EF8A17;
  width: 130px;
  height: 130px;
  margin-left: 4px;
  filter: drop-shadow(0px 0px 7px rgb(0 0 0 / 0.3));
`;

export const FormLogo = styled.img`
  width: 100px;
  height: 100px;
  margin-top: -8px;
  align-self: center;
  filter: drop-shadow(0px 0px 7px rgb(0 0 0 / 0.2));
`;

export const FormChef = styled(SiCodechef)`
  color:#EF8A17;
  width: 90px;
  align-self: center;
  height: 90px;
  margin-left: 4px;
  filter: drop-shadow(0px 0px 7px rgb(0 0 0 / 0.3));
`;

export const StartSessionButton = styled(Button)`
  background-color: #EF8A17;
  border: none;
  color: #fff;
  width: 280px;
  padding: 15px 20px;
  border-radius: 7px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

export const Form = styled.form`
  display: flex;
  width: 210px;
  flex: 1;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
`;

export const LoginTitle = styled.h5`
  color: #EF8A17;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 9px;
  text-align: center;
`;

export const LoginInput = styled(Input)`
  
  & input {
    background-color: #FFF;
    border: none;
    height: 45px;
    width: 100%;
    padding: 10px 20px;
    margin: 6px 0;
    border-bottom: 4px solid #A9A9A9;
  }

  & input:focus {
    border-bottom: 4px solid #ef8a17;
  }
`;

export const LoginButton = styled(Button)`
  background-color: #EF8A17;
  color: #fff;
  border: none;
  margin: 10px 0;
  border-radius: 7px;
  padding: 5px 15px;
  font-size: 17px;
  font-weight: 600;
  height: 40px;
  letter-spacing: 0.5px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
`;
