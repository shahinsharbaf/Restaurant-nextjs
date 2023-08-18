import React from "react";
import MenuCard from "./MenuCard";

function Menu({ menu }) {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => {
              return <MenuCard item={item} />;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This Restaurant does not have a menu</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Menu;
