import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import DataGrid from ".";
import { getLaunchData } from "@/pages/api";

const getData = async (limit) =>
  (
    await getLaunchData("https://api.spacexdata.com/v5/launches/query", {
      select: "id name date_utc success upcoming details failures links",
      sort: "date_utc",
      limit: limit,
    })
  ).data.docs;

function resizeWindow(width, height) {
  act(() => {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event("resize"));
  });
}
describe("DataGrid", () => {
  it("Render without crashing", async () => {
    const mockData = await getData(20);
    render(<DataGrid data={mockData} />);
    expect(screen.getByTestId("grid-data")).toBeInTheDocument();
    expect(screen.getByTestId("grid-pagination")).toBeInTheDocument();
  });

  it("Correct Pagination", async () => {
    const mockData = await getData(30);
    resizeWindow(1550, 800);
    render(<DataGrid data={mockData} />);

    await waitFor(() => {
      expect(screen.getByTestId("total-pages").textContent).toBe("8");
    });

    resizeWindow(3200, 1270);
    await waitFor(() => {
      expect(screen.getByTestId("total-pages").textContent).toBe("2");
    });
  });

  it("Buttons behaviour", async () => {
    const mockData = await getData(30);
    resizeWindow(3200, 1270);
    render(<DataGrid data={mockData} />);

    const previousButton = screen.getByTestId("previous-button");
    const nextButton = screen.getByTestId("next-button");

    await waitFor(() => {
      expect(screen.getByTestId("total-pages").textContent).toBe("2");
    });

    await waitFor(() => {
      expect(previousButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(previousButton).not.toBeDisabled();
      expect(nextButton).toBeDisabled();
    });
  });
});
