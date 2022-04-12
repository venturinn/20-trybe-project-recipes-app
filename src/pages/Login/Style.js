import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackgroundLogin from '../../images/BackgroundLogin.jpg';

export const LoginContainer = styled.section`
  background-image: url(${BackgroundLogin});
  background-size: 430px 640px;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
`;

export const OpacityContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3) ;
  padding: 40px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Title = styled.h1`
  color: #FFF;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
  text-align: center;
`;

export const StartSessionButton = styled(Button)`
  background-color: #EF8A17;
  border: none;
  color: #000;
  width: 280px;
  padding: 15px 20px;
  border-radius: 7px;
  font-size: 20px;
`;

export const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

export const LoginTitle = styled.h3`
  color: #FFF;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 35px;
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
  font-weight: bold;
  height: 40px;
  letter-spacing: 0.5px;
`;
