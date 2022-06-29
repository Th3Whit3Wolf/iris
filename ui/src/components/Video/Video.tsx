import { useElementSize } from "#hooks";
import Box from "@mui/material/Box";
import JoLPlayer, { callBackType, JoLPlayerRef } from "jol-player";
import { useRef, useEffect, useState } from "react";

const sxVideo = {
	margin: "10px",
	border: "2px solid grey",
	// backgroundColor: theme.palette.tertiary.light3,
	width: "400px",
	height: "400px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
};

const Video = ({ src }: { src: string }) => {
	const [_squareRef, { width, height }] = useElementSize();
	console.log(`Video Dimensions(h/w): ${height}/${width}`);
	return (
		<Box sx={sxVideo}>
			<VideoInner src={src} width={width} height={height} />
		</Box>
	);
};

const VideoInner = ({
	src,
	width,
	height
}: {
	src: string;
	width: number;
	height: number;
}) => {
	const videoRef = useRef<JoLPlayerRef>(null!);
	const [theme, setTheme] = useState<string>("#ffb821");
	const onProgressMouseUp: callBackType = val => {
		console.log(`onProgressMouseUp`, val);
	};
	const onEndEd: callBackType = val => {
		console.log(`onEndEd`, val);
		videoRef.current.seek(0);
		videoRef.current.play();
	};

	const onPlay: callBackType = val => {
		console.log(`onPlay`, val);
	};

	const onError = () => {
		console.log(`onError`);
	};
	useEffect(() => {
		console.log(`videoRef.current`, videoRef.current);
		videoRef.current.play();
	}, [videoRef.current]);

	return (
		<JoLPlayer
			ref={videoRef}
			onProgressMouseUp={onProgressMouseUp}
			onEndEd={onEndEd}
			onPlay={onPlay}
			onError={onError}
			option={{
				videoSrc: src,
				width,
				height,
				theme,
				language: "en",
				isShowMultiple: false,
				isShowSet: false,
				isShowScreenshot: false,
				isShowPicture: false,
				isShowWebFullScreen: false,
				isShowPauseButton: false,
				isToast: false,
				isProgressFloat: false
			}}
		/>
	);
};

export default Video;
