import { useHistory } from "react-router-dom";
import BaseLayout from "../layouts/base";
import * as shopApi from "../apis/shop";
import useApi from "../hooks/use-api";
import { useEffect, useState } from "react";
import { AppLoading } from "../components";

export default function ShopNameScreen() {
  const shopExistsApi = useApi(shopApi.isShopExists, {
    keyExtractor: "isShopExists",
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isShopExists, setIsShopExists] = useState(false);
  const [shopname, setShopname] = useState("");

  useEffect(() => {
    shopExistsApi.request().then((res) => {
      const isShopExists = res.data.isShopExists;
      if (isShopExists) {
        handleProceed();
      }
    });
  }, []);

  const handleProceed = () => {
    history.replace("/shop");
  };

  const handleChangeInput = (e) => {
    const shopname = e.target.value;

    setIsShopExists(false);
    setShopname(shopname);
  };

  const handleCheckAvailablity = () => {
    setIsShopExists(true);
  };

  const shopAvailable = () => {
    return (
      <div className="mt-2">
        <p className="badge bg-success">Available</p>
      </div>
    );
  };

  if (shopExistsApi.isLoading) {
    return <AppLoading />;
  }

  return (
    <BaseLayout>
      <div className="text-center">
        <h3>Name your Shop</h3>
        <p>Choose a memorable name that reflects your style</p>
        <hr />
      </div>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Shop name ..."
          value={shopname}
          onChange={handleChangeInput}
        />
        {shopAvailable()}
        {isLoading && <AppLoading />}
        {!isLoading && (
          <button className="btn btn-light" onClick={handleCheckAvailablity}>
            Check Availablity
          </button>
        )}
        {isShopExists && (
          <button className="btn btn-primary mx-3" onClick={handleProceed}>
            Proceed
          </button>
        )}
      </div>
    </BaseLayout>
  );
}
