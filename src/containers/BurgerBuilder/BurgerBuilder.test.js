import { configure, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-17-updated";
import { BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import BurgerBuilder from "./BurgerBuilder";
import { Provider } from "react-redux";

// fix error store of Provider when component duoc bao boc boi connect()()
const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <BurgerBuilder onInitIngredients={() => {}} />
      </Provider>
    );
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.contains(<BuildControls />)).toEqual(true);
  });
});
