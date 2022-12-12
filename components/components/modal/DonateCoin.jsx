import React, { useState, useEffect } from "react"
import Dialog, { DialogProps } from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"

import FormControl, { useFormControl } from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Input from "@mui/material/Input"

import Box from "@mui/material/Box"
import Button from "react-bootstrap/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import Container from "@mui/material/Container"

export default function DonateCoin({ show, onHide, address }) {
	async function UpdateSurvey(e) {
		e.preventDefault()
		const { name, description, image, reward, updateBTN } = e.target
		var notificationSuccess = e.target.children[0].firstChild
		var notificationError = e.target.children[0].lastChild
		updateBTN.children[0].classList.remove("hidden")
		updateBTN.children[1].innerText = ""
		updateBTN.disabled = true
		try {
			await window.contract.UpdateSurvey(parseInt(id), name.value, description.value, image.value, Number(reward.value)).send({
				from: window.ethereum.selectedAddress,
				gasPrice: 100_000_000,
				gas: 6_000_000
			})
			notificationSuccess.style.display = "block"
			updateBTN.children[0].classList.add("hidden")
			updateBTN.children[1].innerText = "Update Survey"

			updateBTN.disabled = false
			window.location.reload()
		} catch (error) {
			notificationError.style.display = "none"
			updateBTN.children[0].classList.add("hidden")
			updateBTN.children[1].innerText = "Update Survey"
			updateBTN.disabled = false
		}
		updateBTN.children[0].classList.add("hidden")
		updateBTN.children[1].innerText = "Update Survey"
		updateBTN.disabled = false
	}
	const StyledPaper = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(2),
		color: theme.palette.text.primary
	}))

	return (
		<Dialog onClose={onHide} open={show} fullWidth="true" aria-labelledby="contained-modal-title-vcenter" centered>
			<DialogTitle>Donate Coin</DialogTitle>
			<DialogContent>
				<Container>
					<Box component="form" noValidate onSubmit={UpdateSurvey} autoComplete="off" dividers>
						<StyledPaper sx={{ my: 1, mx: "auto", p: 2 }}>
							<div variant="standard">
								<InputLabel>Target Chain</InputLabel>
								<span>Moonbase Alpha</span>
							</div>
						</StyledPaper>
                        <StyledPaper sx={{ my: 1, mx: "auto", p: 2 }}>
							<div variant="standard">
								<InputLabel>Target Address</InputLabel>
								<span>0x32F48d18db5A63D3345Eaee9d9C326a2cC647B80</span>
							</div>
						</StyledPaper>
						<StyledPaper sx={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', my: 1, mx: "auto", p: 2 }}>
							<FormControl variant="standard">
								<InputLabel>Amount</InputLabel>
								<Input name="amount" />
							</FormControl>
							<div>
								<InputLabel>Balance</InputLabel>
								<p>0.954343 tBNB</p>
							</div>
						</StyledPaper>
					</Box>
					<DialogActions>
						<LoadingButton size="medium" variant="elevated">
							Submit
						</LoadingButton>
					</DialogActions>
				</Container>
			</DialogContent>
		</Dialog>
	)
}
