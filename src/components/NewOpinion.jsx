import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context.jsx";
import Submit from "./Submit.jsx";

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);
  async function addUserOpinion(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");
    console.log(userName, title, body);
    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must be at least 5 characters long.");
    }

    if (userName.trim().length < 2) {
      errors.push("Name must be at least 2 characters long.");
    }

    if (body.trim().length < 20 || body.trim().length > 300) {
      errors.push("Post must be between 20 and 300 characters long.");
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { userName, title, body } };
    }

    // Submit to backend
    await addOpinion({ userName, title, body });

    return { errors: null };
  }
  const [formState, formAction] = useActionState(addUserOpinion, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul>
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}{" "}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
