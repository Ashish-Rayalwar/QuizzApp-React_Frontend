import { useGlobalContext } from "../Context/Context";
const Modal = () => {
  const { modal, closeModal, correct, questions } = useGlobalContext();
  return (
    <div className={`${modal ? "modal-container isOpen" : "modal-container"}`}>
      <div className="modal-content">
        {correct < questions.length / 2 ? (
          <>
            {" "}
            <h2>You Failed 😔😥😿</h2> <p>You answered {correct} </p>{" "}
            <p>Max require {questions.length / 2}</p>
          </>
        ) : (
          <>
            {" "}
            <h2>congrats</h2>
            <p>You answered {correct}</p>
          </>
        )}

        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};
export default Modal;
