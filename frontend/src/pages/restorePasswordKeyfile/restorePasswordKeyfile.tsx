import clsx from 'clsx';
import { Button } from 'components/form/button/button';
import { Input } from 'components/form/input/input';
import { HomeLayout } from 'components/homeLayout/homeLayout';
import { messageToast } from 'components/utils';
import React, { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IRootState } from 'store/store';
import { updatePassword } from 'store/user/actions';
import { useDevice } from 'utils/useDevice';
import './RestorePasswordKeyfile.scss';

export const RestorePasswordKeyfile: FC = () => {
	const history = useHistory();
	const { isDesktop } = useDevice();
	const dispatch = useDispatch();
	const { isDarkTheme } = useSelector((state: IRootState) => state.theme);
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!password) {
			messageToast('Please enter password');
			return;
		}
		dispatch(updatePassword(password));
		history.push('/restore-keyfile');
	};

	if (isDesktop) {
		return (
			<HomeLayout>
				<div className={clsx('DesktopRestorePassword', isDarkTheme && 'DesktopRestorePassword--dark')}>
					<div className="DesktopRestorePassword__card">
						<h2 className="DesktopRestorePassword__heading">Enter account password</h2>
						<p className="DesktopRestorePassword__paragraph">
							The password you enter decrypts your key file and provides access to your funds.
						</p>
						<form className="DesktopRestorePassword__form" onSubmit={handleSubmit}>
							<Input
								className="DesktopRestorePassword__form-input"
								placeholder="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value.trim())}
							/>
							<Button
								className="DesktopRestorePassword__form-cta"
								variant="solid"
								color="primary"
								type="submit"
								size="lg"
								isDarkTheme={isDarkTheme}
							>
								Ok
							</Button>
						</form>
					</div>
				</div>
			</HomeLayout>
		);
	}

	return (
		<HomeLayout>
			<main className={clsx('RestorePassword', isDarkTheme && 'RestorePassword--dark')}>
				<h2 className="RestorePassword__heading">Enter account password</h2>
				<p className="RestorePassword__paragraph">
					The password you enter decrypts your key file and provides access to your funds.
				</p>
				<form className="RestorePassword__form" onSubmit={handleSubmit}>
					<Input
						className="RestorePassword__form-input"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value.trim())}
					/>
					<Button
						className="RestorePassword__form-cta"
						variant="solid"
						color="primary"
						type="submit"
						isDarkTheme={isDarkTheme}
					>
						Set Password
					</Button>
				</form>
			</main>
		</HomeLayout>
	);
};
