package fr.ujf.m2pgi.database.entities;

import javax.persistence.*;

/**
 * 
 * @author FAURE Adrien ()
 *
 */
@Entity
@Table(name="photo")
public class Photo {

	@Id
	@Column(name="photoID", columnDefinition = "serial")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long photoID;
	
	@ManyToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name = "seller_id", nullable = false)
	private Seller author;

	@Column(name="description")
	private String description;
	
	@Column(name="name", nullable=false)
	private String name;
	
	@Column(name="web_location", nullable=false)
	private String webLocation; //FIXME choose better name (maybe publicLocation, watermarkLocation ...)

	@Column(name="file_location", nullable=false)
	private String fileLocation; // FIXME same here : origirnalLocation
	
	@Column(name="price")
	private float price;

	public String getFileLocation() {
		return fileLocation;
	}

	public void setFileLocation(String fileLocation) {
		this.fileLocation = fileLocation;
	}

	public String getWebLocation() {
		return webLocation;
	}

	public void setWebLocation(String webLocation) {
		this.webLocation = webLocation;
	}

	public long getPhotoID() {
		return photoID;
	}

	public void setPhotoID(long photoID) {
		this.photoID = photoID;
	}

	public Seller getAuthor() {
		return author;
	}

	public void setAuthor(Seller author) {
		this.author = author;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

}
