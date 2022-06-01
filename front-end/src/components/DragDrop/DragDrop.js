import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as DragIndicator } from "../../assets/drag-indicator.svg";

import axios from 'axios';

const SYMPLETE_API = process.env.REACT_APP_SYMPLETE_API || "http://localhost:3001/";

export default function DragDrop() {
	console.log("API: ", SYMPLETE_API)
	const dragItem = useRef();
	const dragOverItem = useRef();
	const [list, setList] = useState();

	const dragStart = (e, position) => {
		dragItem.current = position;
	};

	const dragEnter = (e, position) => {
		dragOverItem.current = position;
	};

	const dragOver = (e) => {
		e.preventDefault();
	}

	const drop = async (e) => {
		const copyListItems = [...list];
		let dragItemContent = copyListItems[dragItem.current];
		copyListItems[dragItem.current] = copyListItems[dragOverItem.current];
		copyListItems[dragOverItem.current] = dragItemContent;
		setList(copyListItems);
		await updateCategory(copyListItems);
	}

	const fetchData = async () => {
		let res = await axios.get(`${SYMPLETE_API}/categories`);
		let data = res.data;
		data.sort((a, b) => a.priority - b.priority);
		setList(data);
	}

	async function updateCategory(list) {
		let res = await axios.post(`${SYMPLETE_API}/update`, {
			list
		})
		console.log("Update Response: ", res);
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<>
			<Container>
				<List>
					{list && list.map((item, index) => (
						<Item
							onDragStart={(e) => dragStart(e, index)}
							onDragEnter={(e) => dragEnter(e, index)}
							onDragEnd={drop}
							onDragOver={dragOver}
							key={index}
							draggable>
								<span style={{fontWeight: 'normal'}}>{item.category}</span>
								<DragIndicator style={{
									float: 'right', 
									padding: 'inherit',
									cursor: '-webkit-grab',
								}} />
						</Item>
					))}
				</List>
			</Container>
		</>
	);
}

const Container = styled.div`
	position: relative;
	background-color: #f2f6fe;
	width: 500px;
	padding: 10px;
	border-radius: 10px;
	margin: auto;
`

const List = styled.ul`
	list-style-type: decimal;
	font-weight: bold;
`

const Item = styled.li`
	background-color: white;
	margin-top: 20px;
	text-align: left;
	font-size: 26px;
	padding: 10px;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 8px;
`