import React from "react";

function AuthModalInputs({ inputs, handelChangeInput, isSiginin }) {
  return (
    <div>
      {!isSiginin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={inputs.firstName}
            onChange={handelChangeInput}
            name="firstName"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastName}
            onChange={handelChangeInput}
            name="lastName"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={inputs.email}
          onChange={handelChangeInput}
          name="email"
        />
      </div>
      {!isSiginin && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-full"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handelChangeInput}
            name="phone"
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-full"
            placeholder="City"
            value={inputs.city}
            onChange={handelChangeInput}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={inputs.password}
          onChange={handelChangeInput}
          name="password"
        />
      </div>
    </div>
  );
}

export default AuthModalInputs;
