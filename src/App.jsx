import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		return savedTodos ? JSON.parse(savedTodos) : [];
	});
	const [showAll, setshowAll] = useState(true);
	const [showCompleted, setshowCompleted] = useState(false);
	const [showIncomplete, setshowIncomplete] = useState(false);

	const saveButtonRef = useRef(null);

	const saveToLS = useCallback(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		saveToLS();
	}, [todos, saveToLS]);

	const toggleFinished = () => {
		setshowAll(!showAll);
		setshowCompleted(false);
		setshowIncomplete(false);
	};

	const toggleCompleted = () => {
		setshowCompleted(!showCompleted);
		setshowAll(false);
		setshowIncomplete(false);
	};

	const toggleIncomplete = () => {
		setshowIncomplete(!showIncomplete);
		setshowAll(false);
		setshowCompleted(false);
	};

	const handleEdit = (id) => {
		const t = todos.find((i) => i.id === id);
		setTodo(t.todo);
		const newTodos = todos.filter((item) => item.id !== id);
		setTodos(newTodos);
	};

	const handleDelete = (id) => {
		const newTodos = todos.filter((item) => item.id !== id);
		setTodos(newTodos);
	};

	const handleAdd = () => {
		setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
		setTodo("");
	};

	const handleChange = (e) => {
		setTodo(e.target.value);
	};

	const handleCheckbox = (id) => {
		const newTodos = todos.map((item) => {
			if (item.id === id) {
				return { ...item, isCompleted: !item.isCompleted };
			}
			return item;
		});
		setTodos(newTodos);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			saveButtonRef.current.click();
		}
	};
    
	return (
		<div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[38%]">
			<h1 className="font-bold text-center text-3xl">Manage your Todos</h1>
			<div className="addTodo my-5 flex flex-col gap-4">
				<h2 className="text-2xl font-bold">Add a Todo</h2>
				<div className="flex">
					<input
						onChange={handleChange}
						value={todo}
						type="text"
						className="w-full rounded-full px-5 py-1"
						onKeyDown={handleKeyPress}
					/>
					<button
						ref={saveButtonRef}
						onClick={handleAdd}
						disabled={todo.length <= 3}
						className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
					>
						Save
					</button>
				</div>
			</div>
			<div>
				<input
					className="my-4"
					id="show"
					onChange={toggleFinished}
					type="checkbox"
					checked={showAll}
				/>
				<label className="mx-2 py-1" htmlFor="show">
					Show All
				</label>
				<input
					className="my-4"
					id="showcompleted"
					onChange={toggleCompleted}
					type="checkbox"
					checked={showCompleted}
				/>
				<label className="mx-2 py-1" htmlFor="showcompleted">
					Show Completed
				</label>
				<input
					className="my-4"
					id="showincomplete"
					onChange={toggleIncomplete}
					type="checkbox"
					checked={showIncomplete}
				/>
				<label className="mx-2 py-1" htmlFor="showincomplete">
					Show Incomplete
				</label>
			</div>

			<div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
			<h2 className="text-2xl font-bold">Your Todos</h2>
			<div className="todos">
				{todos.length === 0 && <div className="m-5">No Todos to display</div>}
				{todos.map((item) => {
					return (
						(showAll ||
							(showCompleted && item.isCompleted) ||
							(showIncomplete && !item.isCompleted)) && (
							<div key={item.id} className={"todo flex my-3 justify-between"}>
								<div className="flex gap-5">
									<input
										name={item.id}
										onChange={() => handleCheckbox(item.id)}
										type="checkbox"
										checked={item.isCompleted}
										id={item.id}
									/>

									<label
										className={item.isCompleted ? "line-through" : ""}
										htmlFor={item.id}
									>
										{item.todo}
									</label>
								</div>
								<div className="buttons flex h-full">
									<button
										onClick={() => handleEdit(item.id)}
										className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
									>
										<FaEdit />
									</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
									>
										<AiFillDelete />
									</button>
								</div>
							</div>
						)
					);
				})}
			</div>
		</div>
	);
}

export default App;
