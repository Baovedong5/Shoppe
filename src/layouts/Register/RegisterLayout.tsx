import Footer from "src/components/Footer";
import RegisterHeader from "src/components/RegisterHeader";

interface IProps {
  children?: React.ReactNode;
}

const RegisterLayout = (props: IProps) => {
  const { children } = props;
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  );
};

export default RegisterLayout;
