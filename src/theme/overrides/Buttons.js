const Buttons = (theme) => {
    return {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
        },
      }
    };
  };
  
  export default Buttons;
  