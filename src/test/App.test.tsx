import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from '../App';


describe("FrontEnd App tests", () => {

  describe("basic app tests", () => {
    it('Should render the App', () => {
      render(<App />);
      const linkElement = screen.getByText("Welcome User, Your tasks are:");
      expect(linkElement).toBeInTheDocument();
    });
  
    it("Should render the addTodoButton", () => {
      render(<App />)
      const buttonElement = screen.getByText("+")
      expect(buttonElement).toBeInTheDocument();
    })
  
    it("addTodoWindow shoud not be rendered", () => {
      render(<App />)
      const textElement = screen.queryByText("Type your task: ")
      expect(textElement).not.toBeInTheDocument();
    })
  
    it("When click addTodoButton addTodoWindow should open", async () => {
      const user = userEvent.setup()
      render(<App />)
      const buttonElement = screen.getByText("+")
      await user.click(buttonElement)
      const inputElement = screen.getByPlaceholderText(/Enter your task.../i)
      expect(inputElement).toBeInTheDocument();
    })
  })
  
  describe("AddTodoWindow tests", () => {
    it("When click X in addTodoWindow, this one should close", async () => {
      const user = userEvent.setup()
      render(<App />)
      const buttonElementOpen = screen.getByText(/\+/i)
      await user.click(buttonElementOpen)
      const buttonElementClose = screen.getByText(/x/i)
      await user.click(buttonElementClose)
      const inputElement = screen.queryByPlaceholderText(/Enter your task.../i)
      expect(inputElement).not.toBeInTheDocument()
    })
  
    it("Should be able to type into input element in addTodoWindow", async () => {
     const user = userEvent.setup()
     render(<App />)
     const buttonElementOpen = screen.getByText("+")
     await userEvent.click(buttonElementOpen)
     const inputElement = screen.getByPlaceholderText(/Enter your task.../i)
     await user.type(inputElement, "exampleText")
     expect(inputElement).toHaveValue("exampleText")
    })
  })

})

