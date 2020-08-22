import DevGoogleService from "./DevGoogleService";
import { IGoogleService } from "./IGoogleService";
import ProductGoogleService from "./ProductGoogleService";

export default function EnvGetGoogleService(): IGoogleService {
    if(__DEV__) {
        return DevGoogleService.getDevGoogleService();
    } else {
        return ProductGoogleService.getProductGoogleService();
    }
}