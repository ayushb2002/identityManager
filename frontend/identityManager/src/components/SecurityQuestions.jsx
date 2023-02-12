import React, { useState, useLayoutEffect } from "react";
import { ReactSession } from "react-client-session";
import { toast } from "react-hot-toast";
import { registerQuestions, returnQuestions } from "../blockchain/interact";

const SecurityQuestions = () => {
  const [adhaar, setAdhaar] = useState(ReactSession.get("adhaar"));
  const [data, setData] = useState(false);
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");

  useLayoutEffect(() => {
    (async () => {
      const questObj = await returnQuestions(adhaar);
      if (questObj) {
        setData(true);
        setQ1(questObj[0]);
        setQ2(questObj[1]);
        setA1('********');
        setA2('********');
      } else {
        setData(false);
      }
    })();
  }, []);

  const setSecurity = async () => {
    var questions = [],
      answers = [];
    questions.push(q1);
    questions.push(q2);
    answers.push(a1);
    answers.push(a2);
    const confirm = await registerQuestions(adhaar, questions, answers);
    if (confirm) {
      toast.success("Questions have been set successfully!");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } else {
      toast.error("Could not set the security questions!");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="my-10 mx-auto">
        <span className="text-3xl">Security questions</span>
      </div>
      {!data && (
        <form className="grid grid-cols-1 mx-auto">
          <div className="form-group mb-5">
            <label className="label">
              <span className="label-text">Question 1</span>
            </label>
            <select
              className="select select-error w-full max-w-xs"
              onChange={(e) => setQ1(e.target.value)}
            >
              <option disabled defaultValue="">
                Select security question 1
              </option>
              <option value="What is your date of birth?">
                What is your date of birth?
              </option>
              <option value="What was your favorite school teacher's name?">
                What was your favorite school teacher's name?
              </option>
              <option value="What's your favorite movie?">
                What's your favorite movie?
              </option>
              <option value="What was your first car?">
                What was your first car?
              </option>
              <option value="What is your astrological sign?">
                What is your astrological sign?
              </option>
            </select>
          </div>
          <div className="form-group mb-5">
            <label className="label">
              <span className="label-text">Your answer</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-warning w-full max-w-xs"
              onChange={(e) => setA1(e.target.value)}
            />
          </div>
          <div className="form-group mb-5">
            <label className="label">
              <span className="label-text">Question 2</span>
            </label>
            <select
              className="select select-error w-full max-w-xs"
              onChange={(e) => setQ2(e.target.value)}
            >
              <option disabled defaultValue="">
                Select security question 2
              </option>
              <option value="What city were you born in?">
                What city were you born in?
              </option>
              <option value="What is your oldest sibling's middle name?">
                What is your oldest sibling's middle name?
              </option>
              <option value="What was the first concert you attended?">
                What was the first concert you attended?
              </option>
              <option value="What was the make and model of your first car?">
                What was the make and model of your first car?
              </option>
              <option value="In what city or town did your parents meet?">
                In what city or town did your parents meet?
              </option>
            </select>
          </div>
          <div className="form-group mb-5">
            <label className="label">
              <span className="label-text">Your answer</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-warning w-full max-w-xs"
              onChange={(e) => setA2(e.target.value)}
            />
          </div>
          <div className="form-group my-5 flex justify-center">
            <button
              type="button"
              className="btn btn-secondary w-32"
              onClick={setSecurity}
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {data && (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>{q1}</td>
                  <td>{a1}</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>{q2}</td>
                  <td>{a2}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-5 flex justify-center">
            <button type="button" className="btn btn-accent" onClick={(e) => setData(false)}>Reset Questions</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityQuestions;
