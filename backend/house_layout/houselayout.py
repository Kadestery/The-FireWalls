import json
import matplotlib.pyplot as plt

def parse_size(size_str):
    # Split the size string into width and height
    width_str, height_str = size_str.split(' x ')
    # Function to parse each dimension (width or height) to total inches
    def dimension_to_inches(dim_str):
        parts = dim_str.split('-')
        if len(parts) == 2:  # If the dimension includes both feet and inches
            feet, inches = map(int, parts)
        elif len(parts) == 1:  # If the dimension includes only feet
            feet = int(parts[0])
            inches = 0
        else:  # In case of unexpected format
            raise ValueError(f"Unexpected size format: {dim_str}")
        return feet * 12 + inches

    width_total_inches = dimension_to_inches(width_str)
    height_total_inches = dimension_to_inches(height_str)
    return width_total_inches, height_total_inches

def create_house_blueprint_from_json(json_file_path, output_file_path):
    # Load JSON data from file
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    # Extract room data
    rooms = data["Smart Home"]["Rooms"]

    # Create a figure and axis for the plot
    fig, ax = plt.subplots()

    # Draw rooms on the plot based on JSON data
    for room_name, details in rooms.items():
        position = details["Position"]
        # Parse the size using the new function
        width, height = parse_size(details["Size"])

        ax.add_patch(plt.Rectangle((position['x'], position['y']), width, height, edgecolor='black', fill=False))
        ax.text(position['x'] + width / 2, position['y'] + height / 2, room_name, ha='center', va='center')

    # Set plot limits and aspect ratio based on your layout's size
    ax.set_xlim(0, 1000)
    ax.set_ylim(0, 800)
    ax.set_aspect('equal')

    # Remove axes
    ax.axis('off')

    # Save the plot to a file
    plt.savefig(output_file_path)

    # Optionally, show the plot
    # plt.show()

# Example usage, replace with your actual JSON file path and desired output file path
json_file_path = "/Users/ishaicohen/Desktop/houselayout/updated_house_layout.json"
output_file_path = "/Users/ishaicohen/Desktop/houselayout/house_layout_plot.png"
create_house_blueprint_from_json(json_file_path, output_file_path)





