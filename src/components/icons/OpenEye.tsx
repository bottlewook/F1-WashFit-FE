interface OpenEyeProps {
  size: number
  onClick: () => void
}

function OpenEye({ size, onClick }: OpenEyeProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={size} height={size} onClick={onClick}>
      <title />
      <g data-name="Layer 2" id="Layer_2">
        <path d="M12,5c-6.54,0-9.76,6.29-9.89,6.55L1.88,12l.22.45C2.24,12.71,5.46,19,12,19s9.76-6.29,9.89-6.55l.22-.45-.22-.45C21.76,11.29,18.54,5,12,5Zm0,12c-4.38,0-7-3.7-7.85-5C5,10.7,7.62,7,12,7s7,3.7,7.85,5C19,13.3,16.38,17,12,17Z" />
        <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
      </g>
    </svg>
  );
}

export default OpenEye;