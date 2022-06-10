import { useNavigate } from "react-router-dom";


export const Home = () => {
  let navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/Senha");
        }}
      >
        {" "}
        Change to about page
      </button>

    </div>
  );
};
