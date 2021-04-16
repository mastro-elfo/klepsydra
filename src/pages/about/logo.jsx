import { SvgIcon } from "@material-ui/core";

export default function Logo(props) {
  return (
    <SvgIcon {...props}>
      <defs>
        <mask id="mask-0">
          <path
            style={{ fill: "rgb(255, 255, 255)" }}
            d="M 175 0 L 325 0 C 425 0 255 200 255 250 C 255 300 425 500 325 500 L 175 500 C 75 500 245 300 245 250 C 245 200 75 0 175 0 Z"
          >
            <title>SandMask</title>
          </path>
        </mask>
      </defs>
      <g transform="matrix(0.048, 0, 0, 0.048, 0.004347, -0.000001)">
        <path
          style={{ fill: "rgb(216, 216, 216)", fillOpacity: 0.25 }}
          d="M 175 0 L 325 0 C 425 0 255 200 255 250 C 255 300 425 500 325 500 L 175 500 C 75 500 245 300 245 250 C 245 200 75 0 175 0 Z"
        >
          <title>BackGlass</title>
        </path>
        <path
          style={{ fill: "rgb(255, 187, 0)", mask: "url(#mask-0)" }}
          d="M 175 500 C 74.558 500 240 400 250 400 C 260 400 425 500 325 500 L 175 500 Z M 350 100 C 325 125 255 260 250 260 C 245 260 175 125 150 100 C 225 125 275 125 350 100 Z"
        >
          <title>Sand</title>
        </path>
        <path
          style={{ fill: "rgb(216, 216, 216)", fillOpacity: 0.25 }}
          d="M 175 0 L 325 0 C 425 0 255 200 255 250 C 255 300 425 500 325 500 L 175 500 C 75 500 245 300 245 250 C 245 200 75 0 175 0 Z"
        >
          <title>FrontGlass</title>
        </path>
        <path
          style={{ fill: "rgb(255, 255, 255)", fillOpacity: 0.5 }}
          d="M 200 0 C 149.993 49.967 250 200 250 250 C 250 300 150 450 200 500 L 250 500 C 200 450 250 300 250 250 C 250 200 200.181 49.154 250 0 L 200 0 Z"
        >
          <title>Light</title>
        </path>
      </g>
    </SvgIcon>
  );
}

// export default function Logo(props) {
//   return (
//     <SvgIcon {...props}>
//       <defs>
//         <mask id="mask-0">
//           <path
//             style={{ fill: "rgb(255, 255, 255)" }}
//             d="M 9.605 0 L 14.405 0 C 19.205 0 12.245 9.6 12.245 12 C 12.245 14.4 19.205 24 14.405 24 L 9.605 24 C 4.805 24 11.765 14.4 11.765 12 C 11.765 9.6 4.805 0 9.605 0 Z"
//           >
//             <title>SandMask</title>
//           </path>
//         </mask>
//       </defs>
//       <path
//         style={{ fill: "rgb(216, 216, 216)", fillOpacity: 0.25 }}
//         d="M 9.6 0 L 14.4 0 C 19.2 0 12.24 9.6 12.24 12 C 12.24 14.4 19.2 24 14.4 24 L 9.6 24 C 4.8 24 11.76 14.4 11.76 12 C 11.76 9.6 4.8 0 9.6 0 Z"
//       >
//         <title>BackGlass</title>
//       </path>
//       <path
//         style={{ fill: "rgb(255, 187, 0)", mask: "url(#mask-0)" }}
//         d="M 9.605 24 C 4.783 24 11.525 19.2 12.005 19.2 C 12.485 19.2 19.205 24 14.405 24 Z M 15.605 4.8 C 14.405 6 12.245 12.48 12.005 12.48 C 11.765 12.48 9.605 6 8.405 4.8 C 12.005 6 12.005 6 15.605 4.8 Z"
//       >
//         <title>Sand</title>
//       </path>
//       <path
//         style={{ fill: "rgb(216, 216, 216)", fillOpacity: 0.25 }}
//         d="M 9.6 0 L 14.4 0 C 19.2 0 12.24 9.6 12.24 12 C 12.24 14.4 19.2 24 14.4 24 L 9.6 24 C 4.8 24 11.76 14.4 11.76 12 C 11.76 9.6 4.8 0 9.6 0 Z"
//       >
//         <title>FrontGlass</title>
//       </path>
//       <path
//         style={{ fill: "rgb(255, 255, 255)", fillOpacity: 0.5 }}
//         d="M 9.6 0 C 7.199 2.398 12 9.6 12 12 C 12 14.4 7.2 21.6 9.6 24 L 12 24 C 9.6 21.6 12 14.4 12 12 C 12 9.6 9.608 2.359 12 0 L 9.6 0 Z"
//       >
//         <title>Light</title>
//       </path>
//     </SvgIcon>
//   );
// }
